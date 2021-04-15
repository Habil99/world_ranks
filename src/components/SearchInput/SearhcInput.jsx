import SearchRounded from '@material-ui/icons/SearchRounded'
import styles from './SearchInput.module.css'

const SearchInput = ({...rest}) => {
    return (
        <div className={styles.wrapper}>
            <SearchRounded color={"inherit"} />
            <input type="text" className={styles.input} {...rest}/>
        </div>
    )
}

export default  SearchInput;
