//这篇使用的是js

1. 单组建数据流 useEffect

function useStateSample{
const [count, setCount]= useState();
}

2. 组件间共享数据流 useContext

const CountContext = createContext();
function App(){
    const [count, setCount]=useState();
    return(
        <CountContext.Provider value={{count, setCount}}>
        <Child />
        </CountContext.Provider>
    )
}
function Child() {
  const { count } = useContext(CountContext);
}