import {useReducer} from "react"
import {useAppSelector} from "~store";

export const CountButton = () => {
    const [count, increase] = useReducer((c) => c + 2, 0)
    const spacesList = useAppSelector((state) => state.notion.spaces);

    return (
        <div>
            Count:
            <span
                className="inline-flex items-center justify-center w-8 h-4 ml-2 text-xs font-semibold rounded-full">
        {count}
      </span>
            {
                spacesList ?
                    spacesList.map(space => (
                        <h1 key={space.id}
                            className="text-3xl text-red-700">{space.name}</h1>
                    )) :
                    <h1 className="text-3xl text-red-700">{count}</h1>
            }
        </div>
    )
}
