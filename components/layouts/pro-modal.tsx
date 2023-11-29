"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import MelaCard from "../pricing/mela";
import GoldMelaCard from "../pricing/goldmela";
import { Icons } from "../icons";

export const ProModal = () => {
  const proModal = useProModal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="bg-accent rounded-lg border-none ring-1 ring-border ring-inset">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
                Buy Awaj Meda Coins
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 font-medium">
            <Tabs defaultValue="silver" className="w-full m-auto ">
              <TabsList className="grid w-full grid-cols-2 bg-card">
                <TabsTrigger className="hover:text-primary active:text-primary" value="silver">Silver</TabsTrigger>
                <TabsTrigger className="hover:text-primary" value="gold">Gold</TabsTrigger>
              </TabsList>
              <TabsContent value="silver">
                <Card>
                  <CardHeader>
                    <CardTitle>Silver Mela</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full m-auto">
                    <MelaCard />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="gold">
                <Card>
                  <CardHeader>
                    <CardTitle>Gold Mela</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full m-auto">
                    <GoldMelaCard/>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link onClick={proModal.onClose} className="text-sm text-primary" href={'https://awajai.com/pricing/awaj-mela'} target="_blank">
            <div className='flex flex-row items-center'>
              Check pricing page
              <Icons.arrowExternalLink className='h-4 w-4 pl-[2px]'/>
            </div>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
