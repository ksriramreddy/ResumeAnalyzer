from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

def rate_pdf(text , role):
    prompt = f"""
    You are a professional AI recruiter and resume evaluator.

    Given the following resume text and a target role, analyze the resume in three aspects:
    - Skills
    - Projects
    - Experience

    Rate each aspect individually on a scale of 0 to 100 for how well it matches the target role.

    Return a JSON object with keys: "skills_match", "projects_match", "experience_match".

    Resume Text:
    \"\"\"
    {text}
    \"\"\"

    Target Role: {role}

    Provide only the JSON object with integer percentages. Example:
    {{
    "skills_match": 80,
    "projects_match": 75,
    "experience_match": 60
    }}
    """

    try:
        resp = client.chat.completions.create(
            model='chatgpt-4o-latest',
            messages=[{'role' : 'user' , 'content' : prompt}]
        )
        data = resp.choices[0].message.content
        print(data)
        return data
    except Exception as e:
        print(f"error {str(e)}")
        return {
            "error" : f"{str(e)}"
        }
