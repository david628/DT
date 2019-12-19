import Chart from "../index";
import layerBase from '../layerBase';
import * as mapv from "mapv/index";
export default class PointTime extends Chart {
    constructor(props) {
        super();
        Object.assign(this, props);
        this.data = [];
        this.init();
    }
    init() {

    }
    refresh() {
        var data = [
            {
                "name": "海南",
                "lon": 109.512,
                "id": "1",
                "value": 300,
                "time": 10,
                "lat": 18.2528
            },
            {
                "name": "北京",
                "lon": 116.46,
                "id": "2",
                "value": 160,
                "time": 10,
                "lat": 39.92
            },
            {
                "name": "杭州",
                "lon": 120.19,
                "id": "3",
                "value": 35,
                "time": 10,
                "lat": 30.26
            },
            {
                "name": "厦门",
                "lon": 118.169,
                "id": "4",
                "value": 200,
                "time": 10,
                "lat": 24.6478
            },
            {
                "name": "太原",
                "lon": 112.335,
                "id": "5",
                "value": 90,
                "time": 10,
                "lat": 37.9413
            },
            {
                "name": "长沙",
                "lon": 113.082,
                "id": "6",
                "value": 45,
                "time": 10,
                "lat": 28.2568
            },
            {
                "name": "重庆",
                "lon": 107.754,
                "id": "7",
                "value": 300,
                "time": 10,
                "lat": 30.1904
            }
        ];
        this.options = {
            fillStyle: 'rgba(55, 50, 250, 1)',
            globalCompositeOperation: "lighter",
            size: 15,
            // animation: {
            //     type: 'time',
            //     stepsRange: {
            //         start: 0,
            //         end: 100
            //     },
            //     trails: 10,
            //     duration: 5,
            // },
            draw: 'simple'
        };
        //if(this.layer) {
            //this.layer.onRemove();
        //}
        //let dataSet = this.getDataSet([]);
        //this.layer = this.getLayer(dataSet, this.options);
        //this.load(data);
        this.remove();
        this.data = data || [];
        let dataSet = this.getPointTime(data);
        this.layer = layerBase.getLayer(this.parent.map, dataSet, this.options);
        this.load(data);
    }
    load(data) {
        this.data = data || [];
        let dataSet = this.getPointTime(this.data);
        this.layer.dataSet.set(dataSet.get());
        this.layer.transferToMercator();
        this.layer.draw();
        // if(this.layer.draw) {
        //     this.layer.draw();
        // } else if(this.layer._canvasUpdate) {
        //     this.layer._canvasUpdate();
        // }

        // if(this.layer._canvasUpdate) {
        //     this.layer._canvasUpdate();
        // } else {
        //     this.layer.draw();
        // }
        //this.layer.update(this.layer);
        //this.layer.dataSet =
        //console.log(this.layer);
    }
    remove() {
        if(this.layer) {
            layerBase.removeLayer(this.layer, this.parent.map);
            this.layer = null;
        }
    }
    getPointTime(ds) {
        let data = ds || [];
        let rs = [];
        for(let i = 0; i < data.length; i++) {
            rs.push({
                geometry: {
                    type: 'Point',
                    coordinates: [data[i].lon, data[i].lat]
                },
                time: data[i].time,
                count: data[i].value
            });

        }
        return new mapv.DataSet(rs);
    }
}
