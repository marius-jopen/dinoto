<script>
    import HeaderLogo from '$lib/components/header-logo.svelte';

    export let items;
    export let style;

    let distanceTop = "h-14"
</script>

<div class="w-full top-0 left-0 z-50 fixed {distanceTop}">
    <div class="box flex justify-between pt-2 pb-4">
        <div class="pt-2">
            <HeaderLogo {style} />
        </div>
    
        <div class="pt-1">
            X
        </div>
    </div>
</div>

<div class="{distanceTop}" />