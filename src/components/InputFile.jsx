import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/InputFile.module.css";
import { BiImageAdd } from "react-icons/bi";

const InArray = (needle, haystack, isObject = false) => {
    if (isObject) {
        let key = Object.keys(needle)[0];
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i].hasOwnProperty(key) && haystack[i][key] === needle[key]) {
                return true;
            }
        }
        return false;
    } else {
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle) return true;
        }
        return false
    }
}

const getExtension = (name) => {
    let n = name.split('.');
    return n[n.length - 1].toLowerCase();
}

const imageExtensions = ['png','jpg','bmp','gif','jpeg'];

const InputFile = ({aspectRatio = '1/1', type = 'image', size = '80px', iconSize = '30%', label = 'Pilih Berkas...', labelStyle, align = 'left', autoClear = false, onChange, width = null, height = null, additionalElement = null, style, icon = null}) => {
    const thisRef = useRef(null);
    const prevArea = useRef(null);
    const [result, setResult] = useState(null);
    const theAligns = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
    };
    let defaultStyle = {
        height: size,
        aspectRatio: aspectRatio,
        ...style
    };

    if (width !== null && height !== null) {
        defaultStyle = {
            height: height,width: width,
            ...style
        }
    }

    useEffect(() => {
        if (prevArea.current !== null && result !== null) {
            prevArea.current.style.backgroundImage = `url(\'${result}\')`;
            prevArea.current.style.backgroundPosition = "center center";
            prevArea.current.style.backgroundSize = "cover";
            prevArea.current.style.border = "none";
            prevArea.current.innerHTML = "";
        }
    }, [prevArea, result])

    return (
        <div className={styles.Container} style={{
            justifyContent: theAligns[align],
        }}>
            <div className={`${styles.Area}`} style={defaultStyle} ref={prevArea}>
                {
                    icon === null ?
                    <BiImageAdd size={iconSize} />
                    :
                    icon
                }
                {
                    label !== "" &&
                    <div style={labelStyle}>{label}</div>
                }
            </div>
            <input type="file" ref={thisRef} className={styles.Input} style={defaultStyle} onChange={e => {
                onChange(thisRef.current, e);
                let file = thisRef.current.files[0];

                if (InArray(getExtension(file.name), imageExtensions) && !autoClear) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.addEventListener('load', event => {
                        setResult(reader.result.toString());
                    })
                }

            }} />

            {
                additionalElement
            }
        </div>
    )
}

export default InputFile;