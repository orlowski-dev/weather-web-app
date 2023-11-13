import { useEffect, useRef, useState } from "react";
import { getGeoDataByName } from "../lib/getData";
import "./Searchbar.scss";

export default function Searchbar({
  callback,
}: {
  callback: (location: ICurrentLocation) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [resData, setResData] = useState<ICurrentLocation[] | null | undefined>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const resRef = useRef<HTMLDivElement>(null);
  let canClose = false;

  useEffect(() => {
    if (inputValue.length < 2) {
      setResData(null);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      getGeoDataByName(inputValue, controller.signal).then((res) => {
        setResData(res);
      });
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [inputValue]);

  return (
    <div className="searchbar">
      <input
        type="text"
        defaultValue={inputValue}
        ref={inputRef}
        placeholder="Enter city name.."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onFocus={() => {
          if (!resRef.current) return;
          resRef.current.style.display = "block";
        }}
        onBlur={() => {
          if (!resRef.current || !canClose) return;
          resRef.current.style.display = "none";
        }}
      />
      {resData !== null ? (
        <div className="result" ref={resRef}>
          {resData && resData.length === 0 && <p>No such city was found.</p>}
          {resData && resData.length > 0 ? (
            <ul>
              {resData.map((elem, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    const { country, lat, lon, name, state } = resData[index];
                    callback({ country, lat, lon, name, state });
                    setResData(null);
                    inputRef.current!.value = "";
                    canClose = true;
                  }}
                >
                  {elem.name}, {elem.state} {elem.country}
                </li>
              ))}
            </ul>
          ) : undefined}
        </div>
      ) : undefined}
    </div>
  );
}
