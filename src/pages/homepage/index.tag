// Dependencies
import "modules/module";

// Styles
import "./style";

<homepage>
  <h1>Homepage</h1>

  <ul>
    <li each={ items }><a href="/resource/{ id }">{ title }</a></li>
  </ul>

  <a href="/page-{ previousPage }">Previous</a>
  <a href="/page-{ nextPage }">Next</a>

  <module />

  <script type="javascript">
    const { branch } = opts.store;

    const self = this;
    const perPage = Number(opts.perPage) || 10;
    const page = Number(opts.page) || 1;

    self.items = [];
    self.previousPage = page - 1;
    self.nextPage = page + 1;

    function render() {
      const items = branch.items;

      self.items = items.slice((page - 1) * perPage, page * perPage);
      self.previousPage = Math.max(page - 1, 1);
      self.nextPage = Math.min(page + 1, Math.ceil(items.length / perPage));

      self.update();
    }

    self.on("mount", () => {
      branch.on("itemsLoaded", render);

      branch.fetchItems();
    });

    self.on("unmount", () => {
      branch.off("itemsLoaded", render);
    });
  </script>
</homepage>
