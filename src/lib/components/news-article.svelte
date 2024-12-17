<script>
    import { PrismicImage } from "@prismicio/svelte";

    export let data;
    export let index;
</script>

<div class="py-2">
    <a href="/news/{data.uid}" class="group">
        <div class="md:flex gap-4 flex-col md:flex-row {index % 2 === 1 ? 'md:flex-row-reverse' : ''}">
            <div class="w-full overflow-hidden transition-all duration-300 group-hover:brightness-75 aspect-[5/3] h-full w-full object-cover rounded-2xl md:rounded-3xl">
                <div class="transform transition-transform duration-300 group-hover:scale-110 aspect-[5/3] h-full w-full object-cover rounded-2xl md:rounded-3xl">
                    <PrismicImage class="aspect-[5/3] h-full w-full object-cover rounded-2xl md:rounded-3xl" field={data.data.image} />
                </div>
            </div>
    
            <div class="w-full flex flex-col justify-center bg-white rounded-2xl md:rounded-3xl overflow-hidden py-8 md:py-0 transition-all duration-300  -mt-8 md:mt-0 pt-16 md:pt-0">
                <h1 class="text-center">
                    {data.data.title[0].text}
                </h1>
    
                <div class="text-center pt-4">
                    {data.data.teaser[0].text}
                </div>
    
                <div class="text-center text-black/50 pb-2 pt-6 text-sm">
                    {data.data.date}
                </div>
            </div>
        </div>
    </a>
</div>