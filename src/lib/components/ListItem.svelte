<script>
    import { PrismicImage, PrismicRichText } from "@prismicio/svelte";

    export let item;
    export let hoverline;
</script>



<div class="group flex flex-col text-center md:text-left md:flex-row w-full border-b border-d_black pb-4 pt-4 grid grid-cols-1 md:grid-cols-4">
    <div class="col-span-1 pb-4 md:pb-0 ">
        <p class="{hoverline ? 'pt-2' : ''}">
            {item.headline}
        </p>
    </div>

    <div class="col-span-1 {hoverline ? 'md:border-t border-transparent group-hover:border-d_lightGray' : ''} ">
        <div class="hidden md:block">
            <div class="invisible group-hover:visible md:block">
                <PrismicImage class="aspect-[2/1] w-8/12 object-cover my-4" field={item.image_1} />
            </div>
        </div>
    </div>

    <div class="col-span-1 pb-2 md:pb-0 {hoverline ? 'md:border-t border-transparent group-hover:border-d_lightGray' : ''}">
        <div class="{hoverline ? 'pt-2 pb-14 ' : ''}">
            <PrismicRichText field={item.text} />
        </div>
    </div>

    <div class="col-span-1 {hoverline ? 'md:border-t border-transparent group-hover:border-d_lightGray' : ''}">
        <div class="hidden md:block">
            <div class="invisible group-hover:visible md:block">
                <PrismicImage class="aspect-[2/1] w-8/12 object-cover my-4" field={item.image_2} />
            </div>
        </div>

        <div class="block md:hidden">
            <div class="flex gap-4 pr-4">
                <PrismicImage class="aspect-[2/1] object-cover w-1/2" field={item.image_1} />
                <PrismicImage class="aspect-[2/1] object-cover w-1/2" field={item.image_2} />
            </div>
        </div>
    </div>
</div>
