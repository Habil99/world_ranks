import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearhcInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filterCountries = countries.filter(
    (country) =>
      country.name.official.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.inputContainer}>
        {/* <div className={styles.counts}>Found {countries.length} countries</div> */}
        <div className={styles.input}>
          <SearchInput
            onChange={onInputChange}
            placeholder="Filter by Name, Region or Subregion"
          />
        </div>
      </div>
      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const response = await fetch("https://restcountries.com/v3.1/region/europe");
  const countries = await response.json();

  return {
    props: {
      countries,
    },
  };
};
