import { NextResponse, NextRequest } from "next/server"
import Replicate from "replicate";

export function API(api){
    return new Replicate({
        auth : api
    })
}

const model = "replicate/dreambooth:a8ba568da0313951a6b311b43b1ea3bf9f2ef7b9fd97ed94cebd7ffd2da66654"

export async function POST(req, res) {
    let data = [];
    for await (const chunk of req.body) {
        data.push(...chunk);
    }

    const stringData = String.fromCharCode(...data)
    const body = JSON.parse(stringData);

    const replicate = new Replicate({
        auth: body.api_key,
    })

    const input = {
        class_prompt: body.class_prompt,
        instance_prompt: body.instance_prompt,
        max_train_steps: parseInt(body.max_train_steps),
        instance_data: "https://dl.dropboxusercontent.com/s/bs3rp64lpmgs06f/data.zip?dl=0",
        ckpt_base: "https://huggingface.co/SG161222/Realistic_Vision_V2.0/resolve/main/Realistic_Vision_V2.0.ckpt",
        num_class_images: parseInt(body.num_class_image),
        learning_rate: parseInt(body.learning_rate)
    }

    console.log(input);

    let output;
    let FINAL_MODEL;
    try{
        output = await replicate.run(model, {input})
        FINAL_MODEL = await output.json();
        FINAL_MODEL.modelget = true
    } catch(e) {
        FINAL_MODEL = {
            error: e.message,
            modelget : false
        };
    }

    return NextResponse.json(
        FINAL_MODEL
    )
}
