import React, { FC, PropsWithChildren } from "react"

import { createUseStyles } from "react-jss"
import BG from '@/public/logo/google-logo.png'
import ARCH from '@/public/gallery/pre-conf/architecture.png'
import Image from "next/image"


const ICON_SIZE = 100

const useStyles = createUseStyles(theme => ({
  root: {
    backgroundImage: ARCH,
    maxWidth: 1060,
    maxHeight: 1521,
    borderRadius: "32px",
    border: "5px solid #EFEFF7",
    // padding: theme.spacing(11),
  },
  logo: {
    boxShadow: "9px 3px 20px 1px rgb(0 0 0 / 10%)",
    height: 150,
    width: 150,
    borderRadius: 8,
  },
//   icon: {
//     borderRadius: 8,
//     width: ICON_SIZE,
//     height: ICON_SIZE,
//     position: "absolute",
//     // Need to offset the values due to `excavate: true` in qrcode.react
//     // top: `calc(50% - ${ICON_SIZE / 2 + 1}px)`,
//     // Need to offset the values due to `excavate: true` in qrcode.react
//     // left: `calc(50% - ${ICON_SIZE / 2 - 5}px)`,
//   },
  qrContainer: {
    position: "relative",
    backgroundColor: "#EFEFF7",
    borderRadius: "56px",
    // margin: theme.spacing(8, 0),
    // padding: theme.spacing(4),
  },
  qrInner: {
    backgroundColor: "white",
    borderRadius: "32px",
    padding: 90,
  },
  referredBy: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "29px",
    letterSpacing: "0.1em",
  },
}))

const QRCodeTemplate: FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root} id="fancy-qr-code">
      <Image alt="logo" src={BG.src}></Image>
      <p className="mt-7" >
        To register, scan the QR Code.
      </p>

      <div className={classes.qrContainer}>
        {/* <img
          alt="icon"
          className={classes.icon}
          height={ICON_SIZE}
          src={BG.src}
          width={ICON_SIZE}
        /> */}
        <div className={classes.qrInner}>{children}</div>
      </div>
      <p className={classes.referredBy}>
        REFERRED BY
      </p>
      <p >Ansh Saini</p>
    </div>
  )
}

export default QRCodeTemplate