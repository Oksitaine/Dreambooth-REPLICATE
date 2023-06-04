## Dashboard for Training model - DREAMBOOTH

For training a model with dreambooth in replicate, you can make one theoretically [her](https://replicate.com/replicate/dreambooth/versions/a8ba568da0313951a6b311b43b1ea3bf9f2ef7b9fd97ed94cebd7ffd2da66654) but it's not work on this web UI.  
So, i made my own dashboard for create a `output.zip` and after use this output for create picture with Stable Diffusion.  
  
You can see [DEMO](https://nextapp-one-peach.vercel.app/) of this dashboard.  
⚠️ Don't use DEMO for create training model, it's not work because i use cloud function in VERCEL with a timeout of 10 secondes. Clone and use this dashboard in your local machine.

![Picture of Home Page](./ReadMe/HomePage.png)

## How create a training model

First, you need you clone this project in your computer and make following command :

```bash
npm i 
npm run dev
# or
yarn add
yarn dev
# or
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Now you can enter a replicate API key, select CKPT you like and put a direct link download .zip where you have picture for training your model.

You select after that all parameters you need ( Instance prompt... ) and click in `Train model` and wait until in `Link Model` you get a link where you will get your model !

## Learn More

To learn more about this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Replicate Documentation](https://replicate.com/docs) - Create and use Replicate API.