import Map = require('esri/Map');
import MapView = require('esri/views/MapView');
import FeatureLayer = require('esri/layers/FeatureLayer');

export class App {
	readonly placeholder = 'viewDiv';
	readonly url = 'https://services.arcgis.com/nSZVuSZjHpEZZbRo/arcgis/rest/services/Provincies/FeatureServer/0';

	map: Map;
	view: MapView;
	layer: FeatureLayer;

	// Start here...
	// This function is being called from index.html
	start() {
		// Follow the steps describe in the createMap() function
		this.createMap();

		// After creating a map add a layer
		this.addLayerToMap();

		// When a user clicks on the map, act on it
		this.registerClickHandler();

		// When you're done and there is time left
		// Add a Legend
		this.addLegend();

		// When there is still time left...
		// Add a popup
		this.addPopup();
	}

	private createMap() {
		// for more info see:
		// https://developers.arcgis.com/javascript/latest/sample-code/intro-mapview/index.html

		// important:
		// The required modules are already defined at the top of this document,
		// so you don't have to load them in

		// Step 1:
		// create a new Map
		// this.map = ...

		// Note: The placeholder div where the map can be loaded in is already defined in index.html
		// The id of this div is 'viewDiv' and there already is a 'placeholder' property defined at the
		// top of this class that has this value, you can access it via: this.placeholder

		// Step 2:
		// create a new MapView (the MapView is responsible for the rendering of the map)
		// and center on Utrecht at [5.12, 52.09]
		// this.view = ....

		// Step 3:
		// Check if you see a map in the browser!
	}

	private addLayerToMap() {
		// After creating a map you can add data to a map.
		// You can load data on the map from different sources. For example data from a .json file or 
		// you can also load data from api's (as long as they have a spatial property)
		// In this case we will use an api endpoint specifically designed for serving data to be loaded on a map.

		// for more info see:
		// https://developers.arcgis.com/javascript/latest/sample-code/layers-featurelayer/index.html

		// Step 4:
		// Create a new FeatureLayer
		// Use the url that is defined at the top of this class
		// This url points to a service which contains the data of the dutch provinces

		// N.B.: A record that is displayed on a map (in this case a province) is called a graphic or a feature
		// Hence the name FeatureLayer

		// this.layer = ...

		// Step 5:
		// Add the layer to the map

		// Step 6:
		// Check if you see a map with a layer containing the provinces


		// Note: The provinces are now all looking the same, to give each province a different color (symbol)
		// you can add a renderer which renders a different symbol for each unique value (province)
		// for more info see:
		// https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-types/index.html

		// Step 7:
		// Add a UniqueValueRenderer
		// the fieldName on which to visualize the feature is called: OMSCHRIJVI
		// this field contains all the province names

		// If you want you can use ./utils/province-color.ts for a list of province names and color codes

		// Step 8:
		// Check if you see the provinces with different colors		
	}

	private registerClickHandler() {
		// Now that you've got a map with a layer, the next step is to listen to map events and act on those events
		// In this case after a province has been clicked the clicked province should be highlighted on the map.
		// for more info see:
		// https://developers.arcgis.com/javascript/latest/sample-code/view-hittest/index.html

		// Step 9:
		// Set up a 'click' handler on the MapView

		// Step 10:
		// use the hitTest method on the MapView
		// This method returns the data that intersects the clicked location

		// Step 11:
		// When a map contains multiple layers the hitTest method will return the first graphic from each layer
		// at the clicked location, so to get the correct graphic we must 
		// Filter the hitTest results by the province layer

		// Step 12: Get the graphic property from the filtered results

		// Now that you have got the graphic
		// You  must use the LayerView to highlight that graphic on the map
		// A LayerView is responsible for the rendering of the data on the map

		// for more info see:
		// https://developers.arcgis.com/javascript/latest/sample-code/highlight-point-features/index.html

		// Step 13:
		// Get the layerView from this.layer

		// Step 14:
		// Call the highlight method on the layerview

		// Step 15:
		// Click on a province on the map and see if it is highlighted!
	}

	/**
	 * Optional
	 */
	private addLegend() {
		// for more info see:
		// https://developers.arcgis.com/javascript/latest/sample-code/widgets-legend/index.html

		// Step 16:
		// Load the correct module at the top of this document

		// Step 17:
		// Create a new Legend
		// assign values to the view and the layerinfos

		// Step 18:
		// add the legend to the view
	}

	/**
	 * Optional
	 */
	private addPopup() {
		// for more info see:
		// // https://developers.arcgis.com/javascript/latest/sample-code/intro-popuptemplate/index.html

		// Step 19:
		// add a popup
	}
}