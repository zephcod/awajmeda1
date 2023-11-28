import { getApiLimit } from "@/lib/api-limit";
import { GlobalNav } from "../layouts/sidenav";
import { MAX_FREE_COUNTs } from "@/lib/constants";

async function Nav() {
    let lim = 0
    const limitCount = await getApiLimit()
    
    if (!limitCount) {
        lim = 0
    }
    else if (limitCount === 0) {
        lim = 0
    }
    else if (limitCount === -8888){
        lim = 10
    }
    else {
        lim = MAX_FREE_COUNTs - limitCount
    }
    return(
        <GlobalNav apiLimitCount = {lim}/>
    )
}
export default Nav