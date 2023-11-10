import { useEffect, useState } from "react";
import { getGeoDataByName } from "../lib/getData";

export default function Searchbar({
  callback,
}: {
  callback: (location: ICurrentLocation) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [resData, setResData] = useState<ICurrentLocation[] | null | undefined>(
    null
  );

  useEffect(() => {
    if (inputValue.length < 2) return;

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      getGeoDataByName(inputValue, controller.signal).then((res) =>
        setResData(res)
      );
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
      />
      {resData && (
        <div className="result">
          <ul>
            {resData.map((elem, index: number) => (
              <li
                key={index}
                onClick={() => {
                  const { country, lat, lon, name, state } = resData[index];
                  callback({ country, lat, lon, name, state });
                  setResData(null);
                }}
              >
                {elem.name}, {elem.state} {elem.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
