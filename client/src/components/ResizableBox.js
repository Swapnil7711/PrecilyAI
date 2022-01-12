import React, { useState, useRef, useEffect } from 'react'
import { Resizable } from "re-resizable";
import axios from "axios"
import "./ResizableBox.css"
const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
};

function ResizableBox() {
    const ref = useRef(null)
    const [text, setText] = useState({});
    const [quotes, setQuotes] = useState("");
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const [count, setCount] = useState(0);
    const [exeTime, setExeTime] = useState(null)

    useEffect(() => {
        const getData = () => {
            let startTime = Date.now();
            axios.get("/api/getdata").then(res => {
                let endTime = Date.now();
                setExeTime((endTime - startTime) / 1000)
                let data = res.data;
                console.log(data.data);
                setText(data.data)
                setCount(count + 1)
            })
        }
        getData();
    }, [])

    const hanadleQuote = (e) => {
        e.preventDefault();

        setQuotes(e.target.value);
    }

    const addQoute = () => {
        let startTime = Date.now();
        axios.post("/api/postdata", { quotes: quotes }).then(res => {
            let endTime = Date.now();
            setExeTime((endTime - startTime) / 1000)
            setText(res.data.quote)
            setCount(count + 1)
            console.log(res.data.quote)
        }).catch(err => {
            console.log(err.message)
        })
    }

    const updateQoute = () => {

        console.log(text._id)
        setCount(count + 1)
        const id = text._id;
        let startTime = Date.now();
        axios.put("/api/updatedata", { id: id, quotes: quotes }).then(res => {
            let endTime = Date.now();
            setExeTime((endTime - startTime) / 1000)
            setText(res.data.quote)
            console.log(res)
        }).catch(err => {
            console.log(err.message)
        })
    }

    return (
        <div className="box">
            <div className="parentdiv" ref={ref}>
                <div className="app_box">
                    <Resizable
                        style={style}
                        size={{ width, height }}
                        onResizeStop={(e, direction, ref, d) => {
                            setWidth(width + d.width);
                            setHeight(height + d.height);
                        }}
                    >
                        {`${text.quotes} took API time: ${exeTime} seconds `}
                    </Resizable>
                    <Resizable
                        style={style}
                        size={{ width, height }}
                        onResizeStop={(e, direction, ref, d) => {
                            setWidth(width + d.width);
                            setHeight(height + d.height);
                        }}
                    >
                        {`${text.quotes} took API time: ${exeTime} seconds `}
                    </Resizable>
                </div>
                <div>
                    <Resizable
                        style={style}
                        size={{ width, height }}
                        onResizeStop={(e, direction, ref, d) => {
                            setWidth(width + d.width);
                            setHeight(height + d.height);
                        }}
                    >
                        {`${text.quotes} took API time: ${exeTime} seconds `}
                    </Resizable>
                </div>
            </div>

            <div className="input_data">
                <input onChange={hanadleQuote} type="text" className="input_text" />

                <div className="buttons">
                    <button onClick={addQoute} className="submit_text">
                        Add
                    </button>
                    <button onClick={updateQoute} className="update_text">
                        Update
                    </button>
                </div>

                <div className="count_span">{`user has made ${count} API request`}</div>
            </div>

        </div>

    )
}

export default ResizableBox
