import React, { useEffect, useState } from 'react'
import axios from 'axios'

function DataFetching() {
    const [posts, setPosts] = useState([])
    const [Date, setDate] = useState(1)
    useEffect(() => {
        axios.get('http://localhost:8000/api/task/')
            .then(res => {
                console.log(res.data)
                setPosts(() => res.data)
            })
            .catch(err => { console.log(err) })
    }, [posts.length])
    return (
        <div>
            <input type="text" value={Date} onChange={e => setDate(e.target.value)} />
            <div>{posts.map(value => {
                const taskdata = value.body.split('|')
                return <div>{taskdata[0]} - {taskdata[1]}</ div>
            })}</div>
        </div>
    )
}
export default DataFetching