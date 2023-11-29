import React from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Slider } from '../ui/slider'
import { formatPrice } from '@/lib/utils'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import { useProModal } from '@/hooks/use-pro-modal'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'

const GoldMelaCard = () => {
    const [loading, setLoading] = React.useState(false);
    const [goldMela, setGoldMela] = React.useState<[number]>([20])
    const goldPriceFormat = Number(goldMela)
    const goldMelaPrice = (goldPriceFormat*20)
    const proModal = useProModal();
    proModal.isOpen = true;

    const onBuy = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/chapa-n?amount=${goldMelaPrice}&prod=goldMela`);
  
        window.location.href = response.data.url;
      } catch (error:any) {
        if (error.message === 'Request failed with status code 401') {
          toast.error('You do not have an account please sign up first');
          window.location.href = '/signup';
        } else {
          toast.error(JSON.stringify(error.message));
        }
      } finally {
        proModal.onClose
        setLoading(false);
      }
    }

  return (
    <>
      <div className='bg-accent rounded-2xl ring-2 ring-accent'>
      <div className='flex flex-col gap-4 p-4 relative'>
                <div className="flex flex-row justify-center gap-2">
                  <p> Gold Mela </p>
                  <Badge>+{goldMela[0]}</Badge>
                </div>
                <Slider
                  variant="default"
                  aria-label="Enterprise package slider"
                  thickness="thin"
                  name="456"
                  defaultValue={[20]}
                  min={10}
                  max={400}
                  step={10}
                  value={goldMela}
                  onValueChange={(
                    value: typeof goldMela
                    ) => {
                    setGoldMela(value)
                  }} />
                <div className="flex flex-row items-center gap-2 px-6">
                  <p className="text-center font-extralight text-base">Mela: </p>
                  <Input
                  type="number"
                  inputMode="numeric"
                  defaultValue={goldMela[0]}
                  value={goldMela[0]}
                  min={10}
                  step={10}
                  max={400}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    setGoldMela([value])
                  }} />
                </div>
                <p> {formatPrice(goldMelaPrice)} </p>
              </div>
        <div className='flex flex-col bg-card rounded-2xl w-full'>
            <div className='block font-light text-sm m-auto p-4'>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>All silver mela features included</p>
                </div>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>Free access to prompts lab</p>
                </div>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>Members only gallery access</p>
                </div>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>4X faster response times</p>
                </div>
                <div className='p-1 flex flex-row items-center gap-2'>
                    <Icons.check/><p>No expiry date</p>
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
                        )} Buy Mela</Button>
                        </>
  )
}

export default GoldMelaCard