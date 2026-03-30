import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
  const { index } = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    fetch("https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=14.71.01.1001")
      .then(res => res.json())
      .then(data => {
        setDetail(data.data[0].cuaca[index]);
      });
  }, [index]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Detail Cuaca</h1>

      {detail.map((item, i) => (
        <div key={i} className="border p-4 mb-2 rounded">
          <p>Jam: {item.local_datetime}</p>
          <p>Suhu: {item.t}°C</p>
          <p>Kelembapan: {item.hu}%</p>
          <p>Cuaca: {item.weather_desc}</p>
        </div>
      ))}
    </div>
  );
}