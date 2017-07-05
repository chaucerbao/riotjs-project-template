| import './layout'

homepage
  layout
    h1.homepage__hero { parent.title }

  style.
    @require '../css/settings'

    .homepage__hero
      border: thin solid black

  script.
    declare const opts: any
    this.title = `Homepage${ opts.title ? `: ${opts.title}` : '' }`
    console.log('Homepage module', opts)
