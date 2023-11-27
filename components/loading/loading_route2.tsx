import React from 'react'
import styles from "@/components/loading/page.module.css"
import { symlink } from 'fs'


const LoadingRouteUI2 = () => {
  return (
    <div className={styles.container2}>
        <div className={styles.loader2}>
            <span className='antialiased text-4xl'></span>
            <span></span>
        </div>
    </div>
  )
}

export default LoadingRouteUI2