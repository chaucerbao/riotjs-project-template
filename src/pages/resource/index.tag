// Dependencies
import "modules/module";

// Styles
import "./style";

<resource>
  <h1>Resource</h1>

  <h2>{ item.title }</h2>

  <module />

  <script type="javascript">
    const { branch } = opts.store;

    const self = this;

    self.item = {};

    function render() {
      self.item = branch.items.find(item => item.id == opts.id);

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
</resource>
