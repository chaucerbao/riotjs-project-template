// Dependencies
import riot from 'riot';

<page-layout>
  <header>
    <nav>
      <a href="/">Homepage</a>
      <a href="/not-found">Not Found</a>
    </nav>
  </header>

  <main role="main">
    <yield />
  </main>

  <footer />
</page-layout>
