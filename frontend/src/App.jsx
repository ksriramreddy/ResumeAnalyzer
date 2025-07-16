import { FaCheckCircle, FaTimesCircle, FaLightbulb } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaRegFilePdf } from "react-icons/fa";
import axios from 'axios'
// import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState({
    "strengths": [
      
    ],
    "weaknesses": [
      
    ],
    "suggestions": [
      
    ]
  })
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API
  // console.log(result.skills_match?.toString);

  const fileRef = useRef(null)
  const fileChange = (e) => {
    const file = e.target.files[0]
    if (!file) {
      alert("Please select a file")
      return
    }
    setSelectedFile(file)
    console.log(selectedFile);
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('role', role)
      const resp = await axios.post(`${VITE_BACKEND_API}/uploadfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(typeof (resp.data));
      setResult(resp.data)
      console.log(result);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  }

  return (

    <div className='flex flex-col gap-2 items-center p-10 card mx-auto text-black w-full h-full  '>
      <div className="flex w-full flex-col items-center justify-between">
        <div className="w-full flex items-center flex-col gap-4 ">
          <div className="w-[300px] h-[100px] border-dashed p-3 border-gray-500 rounded-lg flex flex-col  items-center cursor-pointer justify-center gap-5 border-2" onClick={() => { fileRef.current.click() }}>
            <FaRegFilePdf size={70} className=" font-thin text-gray-700 " />
            <h1 className="text-2xl">Click to upload file</h1>
            <input onChange={fileChange} type="file" name="" id="" className="hidden" ref={fileRef} />
          </div>
          {
            selectedFile &&
            <div className="flex items-center justify-around w-[280px] border border-gray-700 p-2 rounded-lg">
              <h1 className="overflow-hidden w-[80%] text-[20px]">{selectedFile.name}</h1>
              <MdDelete onClick={() => { setSelectedFile(null) }} size={20} cursor={'pointer'} />
            </div>
          }
          <div>
            <input className="flex items-center bg-transparent justify-around w-[280px] border border-gray-700 p-2 rounded-lg" type="text" placeholder="Enter role" onChange={(e) => { setRole(e.target.value) }} value={role} />
          </div>
          <div>
            <button onClick={handleSubmit} className="flex items-center justify-around w-[280px] border border-gray-700 p-2 rounded-lg bg-blue-500">{
              loading ? "Analysing..." : "submit"
            }</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-6 w-full mx-auto">
          {/* Strengths */}
          <div className="border rounded-xl p-5 shadow-lg bg-green-50">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <FaCheckCircle /> Strengths
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {result.strengths.map((item, index) => (
                <li key={index} className="text-green-900">{item}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="border rounded-xl p-5 shadow-lg bg-red-50">
            <h2 className="text-2xl font-semibold text-red-700 mb-4 flex items-center gap-2">
              <FaTimesCircle /> Weaknesses
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {result.weaknesses.map((item, index) => (
                <li key={index} className="text-red-900">{item}</li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="border rounded-xl p-5 shadow-lg bg-yellow-50">
            <h2 className="text-2xl font-semibold text-yellow-700 mb-4 flex items-center gap-2">
              <FaLightbulb /> Suggestions for Improvement
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {result.suggestions.map((item, index) => (
                <li key={index} className="text-yellow-900">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
