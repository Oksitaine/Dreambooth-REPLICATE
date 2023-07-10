import { NextResponse, NextRequest } from "next/server"
import Replicate from "replicate";

export const runtime = "nodejs"

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
        instance_data: body.instance_data,
        ckpt_base: body.ckpt,
        num_class_images: parseInt(body.num_class_image),
        learning_rate: parseFloat(body.learning_rate),
        resolution: parseInt(body.resolution)
    }

    let FINAL_MODEL
    let DIRECT_LINK_ZIP
    try{
        DIRECT_LINK_ZIP = await replicate.run(model, {input})
        FINAL_MODEL = {
            link : DIRECT_LINK_ZIP,
            modelget : true
        }
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
