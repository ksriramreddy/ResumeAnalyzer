from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

def rate_pdf(text , role):
    prompt = f"""
    You are a professional AI recruiter and resume evaluator.

    Given the following resume text and a target role, analyze the resume and provide:

    - The strengths of the candidate based on the resume (highlight what is good).
    - The weaknesses or gaps in the resume for this role.
    - Suggestions for how the candidate can improve their resume to better fit this role.

    Return your response strictly as a JSON object with these three keys:
    - "strengths": (a list of strings)
    - "weaknesses": (a list of strings)
    - "suggestions": (a list of strings)

    Resume Text:
    \"\"\"
    {text}
    \"\"\"

    Target Role: {role}

    Provide only the JSON object. Example format:
    {{
        "strengths": ["Strong technical skills", "Good project diversity"],
        "weaknesses": ["Lacks leadership experience"],
        "suggestions": ["Add a section on team management experience"]
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
