import Map = require('esri/Map');
import MapView = require('esri/views/MapView');
import FeatureLayer = require('esri/layers/FeatureLayer');
import Legend = require('esri/widgets/Legend');
import promiseUtils = require('esri/core/promiseUtils');


import { provinceColors, defaultColor } from './utils/province-colors';
import { template } from './utils/popup-template';

export class App {
	readonly placeholder = 'viewDiv';
	readonly url = 'https://services.arcgis.com/nSZVuSZjHpEZZbRo/arcgis/rest/services/Provincies/FeatureServer/0';

	map: Map;
	view: MapView;
	layer: FeatureLayer;

	get renderer() {
		return {
			type: 'unique-value',
			field: 'OMSCHRIJVI',
			uniqueValueInfos: provinceColors.map(({ name, color }) => ({
				value: name,
				label: name,
				symbol: {
					type: 'simple-fill',
					color,
					style: 'solid',
					outline: {
						color: defaultColor,
						width: 2
					}
				}
			}))
		};
	}

	async start() {
		await this.createMap();

		this.addLayerToMap();

		this.registerClickHandler();

		this.addLegend();

		this.addPopup();
	}

	private createMap() {
		return promiseUtils.create(((resolve) => {
			this.map = new Map({
				basemap: 'dark-gray-vector'
			});

			this.view = new MapView({
				map: this.map,
				container: this.placeholder,
				center: [5.12, 52.09],
				zoom: 6
			});

			this.view.when(() => {
				resolve();
			});
		}) as any);
	}

	private addLayerToMap() {
		this.layer = new FeatureLayer({
			url: this.url,
			title: 'Provincies',
			renderer: this.renderer as any
		});

		this.map.add(this.layer);
	}

	private registerClickHandler() {
		let highlight: any;

		this.view.on('click', async (event) => {
			if (highlight) { highlight.remove(); }

			const response = await this.view.hitTest(event);
			const layerResults = response.results.filter(result => result.graphic.layer === this.layer);
			const graphics = layerResults.map(result => result.graphic);

			if (graphics.length === 0) {
				return;
			}

			const layerView = await this.view.whenLayerView(this.layer) as __esri.FeatureLayerView;

			highlight = layerView.highlight(graphics);
		});
	}

	private addLegend() {
		const legend = new Legend({
			view: this.view,
			layerInfos: [{
				layer: this.layer
			}]
		});

		this.view.ui.add(legend, 'bottom-left');
	}

	private addPopup() {
		this.layer.popupTemplate = template as any;

		this.view.popup = {
			dockEnabled: true,
			dockOptions: {
				buttonEnabled: false,
				breakpoint: false,
				position: 'top-right'
			}
		} as any
	}
}