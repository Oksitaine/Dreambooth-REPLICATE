"use client"

import TextInput from '@/composents/TextInput'
import ComboboxSearch from '@/composents/combobox'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const people = [
    { id: 1, name: 'Analog Diffusion' },
    { id: 2, name: 'Dreamlike Photoreal 2.0' },
    { id: 3, name: 'Realistic Vision 2.0' }
]

const CKPT = [
    { id: 1, cpkt:'https://huggingface.co/wavymulder/Analog-Diffusion/resolve/main/analog-diffusion-1.0.ckpt' },
    { id: 2, cpkt:'https://huggingface.co/dreamlike-art/dreamlike-photoreal-2.0/resolve/main/dreamlike-photoreal-2.0.ckpt'},
    { id: 3, cpkt:'https://huggingface.co/SG161222/Realistic_Vision_V2.0/blob/main/Realistic_Vision_V2.0.ckpt' }
]

export default function TrainingModel() {

    const [Loading, setLoading] = useState(false)
    const [Training, setTraining] = useState("")

    const [apikey, setapikey] = useState("0e9e8751b5d2a94da022d952f53299317f689813")
    const [instanceprompt, setinstanceprompt] = useState("a sks woman")
    const [] = useState()
    const [] = useState()
    const [] = useState()
    const [] = useState()
    const [] = useState()


    const handleOnSubmit = async (event) => {
        event.preventDefault()
        toast.success('Training model in progress...')
        setLoading(true)

        const EventJson = DataJson(event)
        const data = await GetModel(EventJson)

        if(data.modelget){
            setLoading(false)
            toast.success('Training model completed')  
            setTraining("SUCCES") 
        } else {
            setLoading(false)
            toast.error(data.error)  
            setTraining("ERROR")
        }   
        console.log();
    }

    return (
        <div className='flex flex-col items-center gap-14 Fonction bg-white' >
            <div className='w-6 h-6 flex flex-col justify-center mt-6 Fonction items-center border-b border-gray-900/10 pb-12' >
                <h1 className='text-5xl pt-5 text-black ' >
                    TRAINING MODEL
                </h1>
            </div>
            <form className='flex flex-col justify-center gap-5 border-b border-gray-900/10 pb-12' onSubmit={handleOnSubmit}  >
                <TextInput title='API KEY' placeholder='Replicate API...' value={apikey} onChange={(e) => setapikey(e.target.value)}/>
                <ComboboxSearch people={people} title="CKPT" />
                <TextInput title='PICTURE FOR TRAINING' placeholder='Enter a direct link download in .zip...' />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <TextInput title='Instance prompt' placeholder='a photo of sks woman...' value={instanceprompt} onChange={(e) => setinstanceprompt(e.target.value)} />
                    <TextInput title='Class prompt' placeholder='a photo of a woman...' value="a woman"/>
                    <TextInput title='Num class image' placeholder='Adding picture for train...' value={50}/>
                    <TextInput title='Resolution' placeholder='In pixels...' value={512} />
                    <TextInput title='Max train steps' placeholder='Time of training...' value={2000} />
                    <TextInput title='Learning rate' placeholder='Epsilon...' value={0.000001} />
                </div>
                <div className='flex flex-col items-center mt-5' >
                    <button
                        type="submit"
                        className="w-36 inline-flex items-center gap-x-2 rounded-md bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        Train model
                    </button>
                </div>
            </form>

            { Loading ? <progress className="progress w-56"></progress> : <div className="progress w-56"/>}
            <form className='w-96' >
                <TextInput title='Link Model' disabled={true} value={Training} />
            </form>
        

        </div>
    )
}

// Function take event data from submit form and rewrite this to a json file
function DataJson(event){
    const Eventjson = {
        "api_key": event.target[0].value,
        "ckpt": event.target[1].value,
        "picture": event.target[3].value,
        "instance_prompt": event.target[4].value,
        "class_prompt": event.target[5].value,
        "num_class_image": event.target[6].value,
        "resolution": event.target[7].value,
        "max_train_steps": event.target[8].value,
        "learning_rate": event.target[9].value
    }
    return Eventjson

}

// Function send json data to api for get final link model
async function GetModel(propsjson){
    const data = await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(propsjson)
    })
    const json = await data.json()
    return json
}