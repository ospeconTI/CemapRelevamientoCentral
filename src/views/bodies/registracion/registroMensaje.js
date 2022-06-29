/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../../redux/routing/actions";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { gridLayout } from "../../css/gridLayout";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class registroMensajeScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.idioma = store.getState().ui.idioma;
		this.idiomas = require("../../../../assets/idiomas/registracion/registroMensaje.json");
	}

	static get styles() {
		return css`
			${gridLayout}

			:host {
				display: grid;
				position: relative;
				height: 100%;
				width: 100vw;
				background-color: var(--color-fondo);
				grid-template-columns: 80%;
				grid-gap: 0rem;
				justify-content: center;
				align-content: center;
				overflow-y: auto;
			}
			:host([hidden]) {
				display: none;
			}
			:host([media-size="large"]) {
				height: 80%;
				width: 25rem;
				place-self: center;
				border-radius: 2rem;
			}
			#x {
				position: absolute;
				top: 1rem;
				right: 1.5rem;
				height: auto;
				font-size: 1.5rem;
				font-weight: 400;
				z-index: 1;
				cursor: pointer;
			}
			#titulo {
				position: relative;
				padding-bottom: 2rem;
				text-align: center;
				font-size: var(--font-header-h1-size);
				font-weight: var(--font-header-h1-weight);
			}
			#subtitulo {
				width: 100%;
				text-align: center;
				font-size: var(--font-header-h1-menos-size);
				font-weight: var(--font-header-h1-menos-weight);
			}
			#leyenda {
				position: relative;
				text-align: center;
				font-size: var(--font-header-h2-size);
				font-weight: var(--font-header-h2-weight);
			}
			#detalle {
				position: relative;
				display: flex;
				text-align: center;
				font-size: var(--font-label-size);
				font-weight: var(--font-label-weight);
				justify-content: center;
				padding-top: 1rem;
			}
		`;
	}
	get _idioma() {
		return this.idiomas[this.idioma];
	}
	render() {
		return html`
			<div id="x" @click=${this.sesion}>X</div>
			<div id="titulo">${this._idioma.titulo1}</div>
			<div id="subtitulo">
				<label id="leyenda"> ${this._idioma.titulo2} </label>
				<label id="detalle"> ${this._idioma.titulo3} </label>
			</div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-registroMensaje-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}

	sesion() {
		store.dispatch(goTo("login"));
	}
	static get properties() {
		return {
			mediaSize: {
				type: String,
				reflect: true,
				attribute: "media-size",
			},
			layout: {
				type: String,
				reflect: true,
			},
			hidden: {
				type: Boolean,
				reflect: true,
			},
			area: {
				type: String,
			},
			current: {
				type: String,
				reflect: true,
			},
		};
	}
}
window.customElements.define("registromensaje-screen", registroMensajeScreen);
