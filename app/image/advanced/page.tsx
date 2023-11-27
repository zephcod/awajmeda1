'use client'
import { getTextImage } from '@/app/_actions/ai/text-image';
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { type z } from "zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from 'react'
import { Icons } from '@/components/icons';
import { Form,
          FormControl,
          FormField,
          FormItem,
          FormLabel,
          FormMessage,
          UncontrolledFormMessage, 
        } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { promptSchema } from "@/lib/validations/ai";
import { img } from "./blob";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type Inputs = z.infer<typeof promptSchema>

export default function GenerateButton  () {
  
  const [isPending, startTransition] = useTransition()
  const [imgsrc, setImgsrc] = useState(img);
  const [silverMela, setSilverMela] = useState<[number]>([2])

  const form = useForm<Inputs>({
    resolver: zodResolver(promptSchema),
  })

  function onSubmit(data: Inputs){
    startTransition(async()=>{
      try {
        const f = await getTextImage(data.prompt)
          setImgsrc(f)
          // form.reset()
      } catch (error:any) {
        if(error?.response?.status === 403){}
      }
    }
    )
  }
  return (
    <div className='flex flex-col md:flex-row items-start gap-5 m-auto'>
      <Form {...form}>
        <form
          className="grid gap-5 items-start w-full h-fit"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
            <FormItem className="w-full">
              <FormLabel>Type your prompt here</FormLabel>
              <FormControl>
                <Textarea
                  aria-invalid={!!form.formState.errors.prompt}
                  placeholder="Describe how the final image should look like..."
                  {...form.register("prompt")}
                  />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.prompt?.message}
              />
            </FormItem>
            <Button
            disabled={isPending}
            // onClick={onSubmit}
            >
            {isPending && (
              <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
              />
              )}
            Generate
            </Button>
            <Separator/>
            <FormItem>
                <FormLabel>AI Model</FormLabel>
                <FormControl>
                    <Select  >
                    <SelectTrigger>
                        <SelectValue placeholder="Select the model used for image generation" 
                        {...form.register("model")}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="apple">Launch Company</SelectItem>
                        <SelectItem value="banana">Launch Product/Service</SelectItem>
                        <SelectItem value="blueberry">Generate Leads</SelectItem>
                        <SelectItem value="grapes">Content Creation</SelectItem>
                        <SelectItem value="pineapple">Social Media Management</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
          </FormItem>
            <FormItem>
              <div className="flex flex-row gap-2 items-center w-fit">
                Count
                <Badge variant='default'>{silverMela[0]}</Badge>
                <Input
                    type="number"
                    inputMode="numeric"
                    defaultValue={silverMela[0]}
                    value={silverMela[0]}
                    min={1}
                    step={1}
                    max={4}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setSilverMela([value])
                    }} />
              </div>
          </FormItem>
          <Accordion type="single" collapsible className="w-full ring-1 rounded-md ring-border px-4 py-1">
              <AccordionItem value='Question 1'>
                  <AccordionTrigger className="text-base">
                      Advanced Control
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="flex flex-col space-y-1">
                        <FormItem className="w-full">
                          <FormLabel>Negative Prompt</FormLabel>
                            <Textarea
                              placeholder="Describe what you DO NOT want in the generated image"
                              {...form.register("negative")}
                              />
                        </FormItem>
                        <FormItem>
                            <FormLabel>Sampler</FormLabel>
                                <Select  >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select the sampling method used." 
                                    {...form.register("model")}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    {/* <SelectLabel>Campaigns</SelectLabel> */}
                                    <SelectItem value="apple">Launch Company</SelectItem>
                                    <SelectItem value="banana">Launch Product/Service</SelectItem>
                                    <SelectItem value="blueberry">Generate Leads</SelectItem>
                                    <SelectItem value="grapes">Content Creation</SelectItem>
                                    <SelectItem value="pineapple">Social Media Management</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            <FormMessage />
                        </FormItem>
                        <FormItem className="w-full">
                          <FormLabel>Seed</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Unique image seed number"
                              {...form.register("seed")}
                            />
                          </FormControl>
                          <UncontrolledFormMessage
                            message={form.formState.errors.prompt?.message}
                          />
                        </FormItem>
                      </div>
                  </AccordionContent>
              </AccordionItem>
              </Accordion>
        </form>
      </Form>
      <img width='500' height='200' src={`data:image/png;base64,${imgsrc}`}/>
      </div>
  )
}
