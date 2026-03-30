import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [cuaca, setCuaca] = useState([]);

  useEffect(() => {
    fetch("https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=14.71.01.1001")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data?.data?.[0]?.cuaca) {
          setCuaca(data.data[0].cuaca);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!cuaca.length) return <p>Loading data cuaca...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Prakiraan Cuaca</h1>

      {cuaca.map((hari, index) => (
        <div key={index} className="border p-4 mt-3">
          <p>Hari ke-{index + 1}</p>
          <p>{hari[0].weather_desc}</p>
          <p>{hari[0].t}°C</p>

          <Link to={`/detail/${index}`} className="text-blue-500">
            Detail
          </Link>
        </div>
      ))}
    </div>
  );
}