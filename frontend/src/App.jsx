
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
  "skills_match": 0,
  "projects_match": 0,
  "experience_match": 0
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
      const resp = await axios.post(`${VITE_BACKEND_API}`, formData, {
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
    <div className='flex flex-col gap-2 items-center p-10 card mx-auto text-black w-full h-full md:w-[90%] mt-10 '>
      
      <div className="w-[300px] h-[300px] border-dashed border-gray-500 rounded-lg flex flex-col items-center cursor-pointer justify-center gap-5 border-2" onClick={() => { fileRef.current.click() }}>
        <FaRegFilePdf size={70} className=" font-thin text-gray-700 " />
        <h1 className="text-2xl">Click to upload file</h1>
        <input onChange={fileChange} type="file" name="" id="" className="hidden" ref={fileRef} />
      </div>
      {
        selectedFile &&
        <div className="flex items-center justify-around w-[280px] border border-gray-700 p-2 rounded-lg">
          <h1 className="w-[80%] text-[20px]">{selectedFile.name}</h1>
          <MdDelete onClick={() => { setSelectedFile(null) }} size={20} cursor={'pointer'} />
        </div>
      }
      <div>
        <input className="flex items-center bg-transparent justify-around w-[280px] border border-gray-700 p-2 rounded-lg" type="text" placeholder="Enter role" onChange={(e) => { setRole(e.target.value) }} value={role} />
      </div>
      <div>
        <button onClick={handleSubmit} className="flex items-center justify-around w-[280px] border border-gray-700 p-2 rounded-lg bg-blue-500">{
          loading? "Analysing..." : "submit"
          }</button>
      </div>
      <div>
        <div className='flex flex-col' >
            <h1 className="z-50">Skill match {result.skills_match}%</h1>
          <div className="w-[400px] duration-500  h-fit bg-transparent border border-[#bebebe] rounded-[30px] text-center relative overflow-hidden text-transparent">
            <div className={`absolute z-0 bg-green-500  left-0 top-0 h-full bg-black`} style={{ width: `${result.skills_match}%` }}>
            </div>
            oko
          </div>
            <h1 className="">Experience Match {result.experience_match}%</h1>
          <div className="w-[400px]  duration-1000 h-fit bg-transparent border border-[#bebebe] rounded-[30px] text-center relative overflow-hidden text-transparent">
            <div className={`absolute  bg-green-500   left-0 top-0 h-full `} style={{ width: `${result.experience_match}%` }}>
            </div>opj
          </div>
            <h1 className="z-50">Peoject Match {result.projects_match}%</h1>
          <div className="w-[400px] duration  h-fit bg-transparent border border-[#bebebe] rounded-[30px] text-center relative overflow-hidden text-transparent">
            <div className={`absolute bg-green-500 left-0 top-0 h-full  transition-all duration ease-in-out`} style={{ width: `${result.projects_match}%` }}>
            </div>no
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
