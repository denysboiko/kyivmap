import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import data from './kyiv.geojson'
import {Dropdown} from 'semantic-ui-react'
import Tooltip from './components/tooltip'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Application extends React.Component {
    tooltipContainer;

    setTooltip(features) {
        if (features.length) {
            ReactDOM.render(
                React.createElement(
                    Tooltip, {
                        features
                    }
                ),
                this.tooltipContainer
            );
        } else {
            this.tooltipContainer.innerHTML = '';
        }
    }

    // constructor(props: Props) {
    constructor(props) {
        super(props);
        this.state = {
            lng: 30.5,
            lat: 50.4,
            zoom: 10
        };
    }

    componentDidMount() {
        const {lng, lat, zoom} = this.state;
        this.tooltipContainer = document.createElement('div');

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
        });

        map.on('load', () => {
            map.addSource('countries', {
                type: 'geojson',
                data: data
            });

            map.addLayer({
                id: 'countries',
                type: 'fill',
                source: 'countries'
            }, 'country-label-lg'); // ID metches `mapbox/streets-v9`

            map.setPaintProperty('countries', 'fill-color', '#99d8c9');
            map.setPaintProperty('countries', 'fill-opacity', 0.5);
            map.setPaintProperty('countries', 'fill-outline-color', '#000000');
            // map.setPaintProperty('countries', "line-width", 2);

        });
        const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
            offset: [-120, 0]
        }).setLngLat([0, 0]).addTo(map);



        map.on('mousemove', (e) => {
            const features = map.queryRenderedFeatures(e.point, {layers: ['countries']});
            tooltip.setLngLat(e.lngLat);
            map.getCanvas().style.cursor = features.length ? 'pointer' : '';
            this.setTooltip(features);
        });

        map.on('mousenter', 'countries', function() {
            map.getCanvas().style.cursor = '';
        });

        map.on('mouseleave', 'countries', function() {
            map.getCanvas().style.cursor = '';
        });


        // map.on('mousemove', (e) => {
        //     const features = map.queryRenderedFeatures(e.point);
        //     tooltip.setLngLat(e.lngLat);
        //     map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        //     this.setTooltip(features);
        // });

        // map.on('move', () => {
        //     const {lng, lat} = map.getCenter();
        //
        //     this.setState({
        //         lng: lng.toFixed(4),
        //         lat: lat.toFixed(4),
        //         zoom: map.getZoom().toFixed(2)
        //     });
        // });
    }

    render() {

        return (
            <div>
                {/*<div*/}
                    {/*className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">*/}
                    {/*<div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>*/}
                {/*</div>*/}
                <div ref={el => this.mapContainer = el} className="absolute top right left bottom"/>
            </div>
        );
    }
}


const stateOptions = [
    {
        "key": 0,
        "text": "Шевченківський",
        "value": "Шевченківський"
    },
    {
        "key": 1,
        "text": "Святошинський",
        "value": "Святошинський"
    },
    {
        "key": 2,
        "text": "Голосіївський",
        "value": "Голосіївський"
    },
    {
        "key": 3,
        "text": "Деснянський",
        "value": "Деснянський"
    },
    {
        "key": 4,
        "text": "Дарницький",
        "value": "Дарницький"
    },
    {
        "key": 5,
        "text": "Подільський",
        "value": "Подільський"
    },
    {
        "key": 6,
        "text": "Оболонський",
        "value": "Оболонський"
    },
    {
        "key": 7,
        "text": "Печерський",
        "value": "Печерський"
    },
    {
        "key": 8,
        "text": "Дніпровський",
        "value": "Дніпровський"
    },
    {
        "key": 9,
        "text": "Солом’янський",
        "value": "Солом’янський"
    }
];

const DropdownExampleMultipleSearchSelection = () => (
    <Dropdown placeholder='State' fluid multiple search selection options={stateOptions}/>
);


ReactDOM.render(<DropdownExampleMultipleSearchSelection/>, document.getElementById('dropdown'));
ReactDOM.render(<Application/>, document.getElementById('app'));
