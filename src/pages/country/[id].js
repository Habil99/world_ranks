import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";

const getCountry = async (id) => {
  const response = await fetch(`https://restcountries.com/v2/name/${id}`);
  const country = await response.json();

  return country;
};

const getCountryByAplha3 = async (aplha3) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${aplha3}`
  );
  const country = await response.json();

  return country;
};

const Country = ({ countries }) => {
  const [borders, setBorders] = useState([]);
  const getBorders = async () => {
    const borders = countries[0].borders
      ? await Promise.all(
          countries[0].borders.map((border) => getCountryByAplha3(border))
        )
      : [];
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={countries[0]?.name?.official}>
      {countries.map((country) => (
        <div className={styles.container} key={country.cca3}>
          <div className={styles.container_left}>
            <div className={styles.overview_panel}>
              <img src={country.flags.png} alt={country?.name?.official} />
              <h1 className={styles.overview_name}>
                {country?.name?.official}
              </h1>
              <div className={styles.overview_region}>{country.region}</div>

              <div className={styles.overview_numbers}>
                <div className={styles.overview_population}>
                  <div className={styles.overview_value}>
                    {country.population}
                  </div>
                  <div className={styles.overview_label}> Population</div>
                </div>
                <div className={styles.overview_area}>
                  <div className={styles.overview_value}>{country.area}</div>
                  <div className={styles.overview_label}>Area</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container_right}>
            <div className={styles.details_panel}>
              <h4 className={styles.details_header}>Details</h4>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Capital</div>
                <div className={styles.details_panel_value}>
                  {country?.capital?.map((capital) => capital).join(",")}
                </div>
              </div>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Languages</div>
                <div className={styles.details_panel_value}>
                  {Object.values(country.languages)
                    .map((language) => language)
                    .join(",")}
                </div>
              </div>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Currencies</div>
                <div className={styles.details_panel_value}>
                  {Object.values(country.currencies)
                    .map((currency) => currency.name)
                    .join(",")}
                </div>
              </div>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Native name</div>
                <div className={styles.details_panel_value}>
                  {country?.name?.official}
                </div>
              </div>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Gini</div>
                <div className={styles.details_panel_value}>
                  {country.gini
                    ? Object.values(country.gini)
                        .map((gini) => gini)
                        .join(",") || "0"
                    : "0"}
                  %
                </div>
              </div>
              <div className={styles.details_panel_borders}>
                <div className={styles.details_panel__borders_label}>
                  Neighbouring Countries
                </div>
                <div className={styles.details_panel_borders_container}>
                  {borders.length > 0 ? (
                    borders.map((border) => (
                      <div
                        className={styles.details_panel_borders_country}
                        key={border[0].name.official}
                      >
                        <img
                          src={border[0].flags.png}
                          alt={border[0].name.official}
                        />
                        <div className={styles.details_panel_borders_name}>
                          {border[0].name.official}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.details_panel__borders_notFound}>
                      There is not neighboring country
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const countries = await getCountryByAplha3(params.id);

  return {
    props: {
      countries,
    },
  };
};
