
import { useEffect, useState } from "react";
import { fetchDiaries } from "../services/diariesServices";
import { IDiaries } from "../types/types";

export default function Diaries() {
    const [diaries, setDiaries] = useState<IDiaries[]>([]);

    useEffect(() => {
        fetchDiaries().then(diaries => {
            if (!diaries) return
            setDiaries(diaries)
        }

        )
    }, [])

    return (
        <div>{diaries.map(diary => (
            <div key={diary.id}>
                <p>{diary.date}</p>
                <span>{diary.visibility}</span>
                <span>{diary.weather}</span>
            </div>
        ))}</div>
    )
}
