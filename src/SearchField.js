import { useState } from 'react';
import { AutoComplete, Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons';


const searchResult = (apiResult) =>
    apiResult.map((info) => {
            return {
                value: info.name,
                label: (
                    <div>
                        <span>
                            {info.name}
                        </span>
                    </div>
                ),
            };
        }
    );


const SearchField = ({ searchValue, setSearchValue, apiResult, setCharactersInfo }) => {
    const [options, setOptions] = useState([]);

    const handleSearch = value => {
        setSearchValue(value);
        setOptions(value ? searchResult(apiResult) : []);
    };

    const handleFieldSelect = () => {
        console.log('searchv alue',  searchValue)
        if (!searchValue) setOptions([]);
    }

    const onSelect = value => {
        setCharactersInfo([apiResult.find((info) => info.name === value)]);
    };

    return (
        <div className='search-container'>
             <AutoComplete
                value={searchValue}
                placeholder='Search by character name'
                dropdownMatchSelectWidth={252}
                style={{
                    width: '250px',
                }}
                popupClassName='options-section'
                onFocus={handleFieldSelect}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
            <div className='redo-container'>
                <Tooltip placement='top' title='Refresh search'>
                    <RedoOutlined className='redo-icon' onClick={() => setCharactersInfo(apiResult)}/>
                </Tooltip>
            </div>
        </div>
    );
};

export default SearchField
