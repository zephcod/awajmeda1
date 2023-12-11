'use client'
import React from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Slider } from '../ui/slider'
import { formatPrice } from '@/lib/utils'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import { useRouter } from 'next/navigation'
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'

const MelaCard = () => {
    const [loading, setLoading] = React.useState(false);
    const [silverMela, setSilverMela] = React.useState<[number]>([2000])
    const silverMelaFormat = Number(silverMela)
    const silverMelaPrice = (silverMelaFormat*.1)
    const proModal = useProModal();
    proModal.isOpen = true;

    const onBuy = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/chapa-n?amount=${silverMelaPrice}&prod=silverMela-${silverMela[0]}`);
  
        window.location.href = response.data.url;
      } catch (error:any) {
        // if (error.message === 'Request failed with status code 401') {
        //   toast.error('You do not have an account please sign up first');
        //   window.location.href = '/signup';
        // } else {
        //   toast.error(JSON.stringify(error.message));
        // }
      } finally {
        proModal.onClose
        setLoading(false);
      }
    }

  return (
    <div>
      <div className='bg-accent rounded-2xl ring-2 ring-accent'>
          <div className='flex flex-col gap-4 p-4 relative'>
                <div className="flex flex-row justify-center gap-2">
                  <p> Added Coins </p>
                  <Badge variant='outline'>+{silverMela[0]}</Badge>
                </div>
                <Slider
                  variant="default"
                  aria-label="Enterprise package slider"
                  thickness="thin"
                  name="456"
                  // defaultValue={silverMela}
                  min={1000}
                  max={10000}
                  step={100}
                  value={silverMela}
                  onValueChange={(
                    value: typeof silverMela
                    ) => {
                    setSilverMela(value)
                  }}
                />
                <div className="flex flex-row items-center gap-2 px-6">
                    <p className="text-center font-extralight text-base">Coin: </p>
                    <Input
                    type="number"
                    inputMode="numeric"
                    // defaultValue={silverMela[0]}
                    value={silverMela[0]}
                    min={1000}
                    step={100}
                    max={10000}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setSilverMela([value])
                    }} />
                </div>
                <p> {`${formatPrice(silverMelaPrice)}`} </p>
          </div>
          <div className='flex flex-col bg-card rounded-2xl w-full'>
            <div className='block font-light text-sm m-auto p-4'>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>Get access to 150+ AI models.</p>
                </div>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>Free access to prompts lab.</p>
                </div>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>Members only gallery access.</p>
                </div>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>Super fast response times.</p>
                </div>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>Private workspace.</p>
                </div>
            </div>
          </div>
      </div>
      <Button className='mt-4' disabled={loading} onClick={onBuy}>
        {loading && (
        <Icons.spinner
        className="mr-2 h-4 w-4 animate-spin"
        aria-hidden="true"
        />
        )} Buy Coin
      </Button>
  </div>
  )
}

export default MelaCard