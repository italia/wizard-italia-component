<!-- markdownlint-disable no-inline-html -->

# Wizard Italia component

Opinionated component to create your guided wizard.

## Installation

```
yarn add wizard-italia-component
```

or

```
npm install wizard-italia-component
```

## Use it as a Web Component

Customization engine lays on Oruga, [check the documentation](https://oruga.io/documentation/#customization) for more info

```html

<link rel="stylesheet" href="module_path/wizard-italia.css">

<wizard-italia 
    matomo-site-id="wBEpDzz0yL"
    configuration-url="https://raw.githubusercontent.com/italia/wizard-italia/main/demo/tree.json"
></wizard-italia>

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script src="module_path/wizard-italia.umd.js"></script>
<script>
  customElements.whenDefined("wizard-italia").then(() => {
    document.querySelector('wizard-italia').styleConfig = {
      iconPack: 'bs',
      iconComponent: 'bs-icon',
      button: {
        rootClass: 'btn',
        outlinedClass: 'btn-outline-',
        disabledClass: 'btn-disabled',
        variantClass: (variant, context) => (!context.props.outlined ? `btn-${variant}` : ''),
      }
    }
  })
</script>
```

## Development

Install dependencies using

```shell
yarn install
```

### Compiles and hot-reloads demo for development

```shell
yarn serve
```

### Lints and fixes files

```shell
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Compiles and minifies for production (lib and web component)

```shell
yarn build-all
```

### Build web component

```
yarn wc
```

### Launch web component demo

Run

```
yarn prepare-wc-demo
```

then go inside `demo` folder and run a dev server, e.g.

```
python -m SimpleHTTPServer 80
```

## Contributing

Every contribution is welcome!

Here is a list of users who contributed to this repository:

<a href="https://github.com/italia/wizard-component/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=italia/wizard-component" />
</a>

