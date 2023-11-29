import React from 'react'
import Image from "next/image";
import styles from '@/components/gallery/popular_orders.module.css';
import Pre1 from '@/public/gallery/pre-conf/1.png'
import Pre2 from '@/public/gallery/pre-conf/2.png'
import Pre3 from '@/public/gallery/pre-conf/3.png'
import Pre4 from '@/public/gallery/pre-conf/4.png'
import Pre5 from '@/public/gallery/pre-conf/5.png'
import Pre6 from '@/public/gallery/pre-conf/6.png'
import Pre7 from '@/public/gallery/pre-conf/7.png'
import Pre8 from '@/public/gallery/pre-conf/8.png'
import Pre9 from '@/public/gallery/pre-conf/9.png'
import Link from 'next/link';
import ExpandingArrow from '../expanding_arrow';

interface ArticleCardrProps {
  id: number; title:string; price:string; img:string;
}
function ArticleCard (props:ArticleCardrProps) {
  return (
    <article className={styles.card}>
    <header className={styles.card_header}>
      <p>17 Orders this week</p>
      <h2>{props.title}</h2>
    </header>
    <div className={styles.imgContainer}>
      <Image
          src={props.img}
          fill={true}
          alt=""
          className={styles.image}
          />
    </div>
      {/* <div className={styles.price}>
        <div className={styles.author_name_prefix}>Starting from</div>
        {props.price}
      </div> */}
    <div className={styles.tags}>
      <Link href="/image/pre-configured">Try</Link>
      <Link href="/gallery/members">+ Gallery</Link>
    </div>
    </article>
  )
}


const MiniGallery = () => {
  return (
    <div className={styles.container}>
    <section className={styles.card_list}>
          <ArticleCard
            id={1}
            title='Portriat'
            price='1,500ETB'
            img={Pre1.src}/>
          <ArticleCard
            id={2}
            title='Portriat'
            price='7,000ETB'
            img={Pre2.src}/>
          <ArticleCard
            id={3}
            title='Portriat In'
            price='1,500ETB'
            img={Pre3.src}/>
          <ArticleCard
            id={4}
            title='Portriat Tube'
            price='1,500ETB'
            img={Pre4.src}/>
          <ArticleCard
            id={5}
            title='Portriat Tok'
            price='1,500ETB'
            img={Pre5.src}/>
          <ArticleCard
            id={6}
            title='Portriat'
            price='1,500ETB'
            img={Pre6.src}/>
          <ArticleCard
            id={7}
            title='Portriat Chat'
            price='1,500ETB'
            img={Pre7.src}/>
          <ArticleCard
            id={8}
            title='Portriat'
            price='1,500ETB'
            img={Pre8.src}/>
          <ArticleCard
            id={9}
            title='Portriat'
            price='1,500ETB'
            img={Pre9.src}/>
          {/* <ArticleCard
            id={10}
            title='Twitter'
            price='1,500ETB'
            img={Twitter.src}/> */}
      </section>
        <div className='absolute my-auto bottom-1'>
          <Link href={'/categories/solutions'} className="relative group mt-20 sm:mt-0 rounded-full flex items-center justify-center mx-auto text-primary-foreground dark:text-secondary text-lg font-light py-2 px-6 transition-all">
            <p>Check more styles...</p>
          <ExpandingArrow/>
          </Link>
        </div>
      </div>
  )
}

export default MiniGallery