<script lang="ts">
  import { createPatimokeAST } from './patimokkha';

  import PaliNodeViewer from './PaliNodeViewer.svelte';

  const patimokAST = createPatimokeAST();
</script>

<div class="w-dvh mx-auto grid place-content-center text-center">
  <PaliNodeViewer node={patimokAST} />
</div>
