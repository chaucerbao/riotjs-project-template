layout
  header.layout__header
    h1 Header

  main.layout__body(role="main")
    #{'yield'}

  footer.layout__footer
    small Footer

  style.
    @import '//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css'
    @require '../css/settings'

    .layout__header
      color: white
      padding: 2.5em 0
      background: linear-gradient(to bottom right, royalblue, midnightblue)
      text-align: center

    .layout__footer
      color: white
      background: linear-gradient(to bottom, black, dimgray)
      padding: 1em
