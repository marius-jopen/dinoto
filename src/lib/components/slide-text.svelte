<script>
    import { PrismicRichText } from "@prismicio/svelte";

    export let data
    export let index
    export let time
    export let status
    export let type

    if (type == "welcome") {
        data = data.data.items[0]
    }
</script>

<div>
    <PrismicRichText field={data.text} />
</div>
