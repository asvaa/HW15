import React, { useEffect, useState } from "react";
import s2 from "../../s1-main/App.module.css";
import s from "./HW14.module.css";
import axios from "axios";
import SuperDebouncedInput from "./common/c8-SuperDebouncedInput/SuperDebouncedInput";
import { useSearchParams } from "react-router-dom";

const getTechs = (find: string) => {
  return axios
    .get<{ techs: string[] }>(
      "https://samurai.it-incubator.io/api/3.0/homework/test2",
      { params: { find } }
    )
    .catch((e) => {
      alert(e.response?.data?.errorText || e.message);
    });
};

const HW14 = () => {
  const [find, setFind] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [techs, setTechs] = useState<string[]>([]);

  const sendQuery = (value: string) => {
    setLoading(true);
    getTechs(value)
      .then((res) => {
        if (res && res.data && Array.isArray(res.data.techs)) {
          setTechs(res.data.techs);
        } else {
          setTechs([]);
        }
      })
      .finally(() => setLoading(false));
  };

  const onChangeText = (value: string) => {
    setFind(value);
    setSearchParams({ find: value });
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    sendQuery(params.find || "");
    setFind(params.find || "");
    // eslint-disable-next-line
  }, []);

  const mappedTechs = techs.map((t) => (
    <div key={t} id={"hw14-tech-" + t} className={s.tech}>
      {t}
    </div>
  ));

  return (
    <div id={"hw14"}>
      <div className={s2.hwTitle}>Hometask № 14</div>
      <div className={s2.hw}>
        <div className={s.inputRow}>
          <SuperDebouncedInput
            id={"hw14-super-debounced-input"}
            value={find}
            onChangeText={onChangeText}
            onDebouncedChange={sendQuery}
            className={s.input} 
          />
          <div id={"hw14-loading"} className={s.loading}>
            {isLoading ? "...ищем" : <br />}
          </div>
        </div>
        {mappedTechs}
      </div>
    </div>
  );
};

export default HW14;
