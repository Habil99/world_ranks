import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from './country.module.css'

const getCountry = async (id) => {
    const response = await fetch(`http://restcountries.eu/rest/v2/alpha/${id}`)
    const country = await response.json();

    return country;
}

const Country = ({ country }) => {
    const [borders, setBorders] = useState([]);
    const getBorders = async () => {
        const borders = await Promise.all(
            country.borders.map(border => getCountry(border))
        )
        setBorders(borders);
    };

    useEffect(() => {
        getBorders();
    }, [])

    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={country.flag} alt={country.name} />
                        <h1 className={styles.overview_name}>{country.name}</h1>
                        <div className={styles.overview_region}>{country.region}</div>

                        <div className={styles.overview_numbers}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>{country.population}</div>
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
                            <div className={styles.details_panel_value}>{country.capital}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Languages</div>
                            <div className={styles.details_panel_value}>{country.languages.map(({ name }) => name).join(", ")}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Currencies</div>
                            <div className={styles.details_panel_value}>{country.currencies.map(({ name }) => name).join(", ")}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Native name</div>
                            <div className={styles.details_panel_value}>{country.nativeName}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Gini</div>
                            <div className={styles.details_panel_value}>{country.gini ? country.gini : "0"}%</div>
                        </div>
                        <div className={styles.details_panel_borders}>
                            <div className={styles.details_panel__borders_label}>Neighbouring Countries</div>
                            <div className={styles.details_panel_borders_container}>
                                {borders.length > 0 ? borders.map(({ flag, name }) => (
                                    <div className={styles.details_panel_borders_country} key={flag}>
                                        <img src={flag} alt={name} />
                                        <div className={styles.details_panel_borders_name}>{name}</div>
                                    </div>
                                )) : <p className={styles.details_panel__borders_notFound}>There is not neighboring country</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Country;

export const getServerSideProps = async ({ params }) => {
    const country = await getCountry(params.id);

    return {
        props: {
            country
        }
    }
}
