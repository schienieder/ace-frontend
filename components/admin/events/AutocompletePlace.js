import React, { Component } from 'react'
import axios from 'axios'

// const AutocompletePlace = ({ onSelect }) => {
    
//     const [search, setSearch] = useState('')
//     const [results, setResults] = useState([])
//     const [isLoading, setIsLoading] = useState(false)

//     const handleSearchChange = (e) => {
//         setSearch(e.target.value)
//         setIsLoading(true)
//         clearTimeout(timeoutId)
//         const timeoutId = setTimeout(() => {
//             performSearch()
//         }, 1000)
//     }

//     const performSearch = () => {
//         if (search === "") {
//             setResults([])
//             setIsLoading(false)
//             return
//         }
//         axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`)
//         .then(response => {
//             setResults(response.data.features)
//             setIsLoading(false)
//         })
//     }

//     const handleItemClicked = (place) => {
//         setSearch(place.place_name)
//         setResults([])
//         onSelect(place)
//     }

//     return (
//         <div className='relative'>
//             <input 
//                 className="inputField" 
//                 type="text" 
//                 value={search} 
//                 name="event_venue"
//                 id="event_venue"
//                 onChange={ handleSearchChange } 
//                 placeholder="Type an address"
//                 autoComplete='off'
//             />
//             <ul className="absolute bg-white p-0 m-0 border border-gray-300">
//             {results.map(place => (
//                 <li
//                     key={place.id}
//                     className="list-none cursor-pointer border-b border-gray-300 hover:bg-gray-100 text-sm p-3"
//                     onClick={() => handleItemClicked(place)}
//                 >
//                 {place.place_name}
//                 </li>
//             ))}
//             {isLoading && <li className="list-none cursor-pointer border-b border-gray-300 hover:bg-gray-100 text-sm p-3">Loading...</li>}
//             </ul>
//         </div>
//     )
// }

// export default AutocompletePlace

export default class AutocompletePlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
        search: this.props.defaultPlace || '',
        results: [],
        isLoading: false,
        defaultPlace : this.props.defaultPlace
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)

        if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
            throw new Error("You don't have any 'process.env.NEXT_PUBLIC_MAPBOX_TOKEN'")
        }
    }
    handleSearchChange(e) {
        this.setState({
        search: e.target.value,
        isLoading: true
        })

        // Stop the previous setTimeout if there is one in progress
        clearTimeout(this.timeoutId)

        // Launch a new request in 1000ms
        this.timeoutId = setTimeout(() => {
        this.performSearch()
        }, 1000)
    }
    performSearch() {
        if (this.state.search === "") {
        this.setState({
            results: [],
            isLoading: false
        })
        return
        }
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`)
        .then(response => {
            this.setState({
            results: response.data.features,
            isLoading: false
            })
        })
    }
    handleItemClicked(place) {
        this.setState({
        search: place.place_name,
        results: []
        })
        this.props.onSelect(place)
    }
    render() {
        return (
            <div className="relative">
                <input 
                    className="inputField" 
                    type="text" 
                    name="event_venue"
                    id="event_venue"
                    onChange={this.handleSearchChange} 
                    value={ this.state.search }
                    placeholder="Type an address"
                    autoComplete='off'
                />
                <ul className="absolute bg-white p-0 m-0 border border-gray-300">
                {this.state.results.map(place => (
                    <li
                        key={place.id}
                        className="list-none cursor-pointer border-b border-gray-300 hover:bg-gray-100 text-sm p-3"
                        onClick={() => this.handleItemClicked(place)}
                    >
                    {place.place_name}
                    </li>
                ))}
                {this.state.isLoading && <li className="list-none cursor-pointer border-b border-gray-300 hover:bg-gray-100 text-sm p-3">Loading...</li>}
                </ul>
            </div>
        )
    }
}