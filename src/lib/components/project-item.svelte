<script>
    export let data
</script>

<div>
    <a href="work/{data.uid}">
        {data.data.title[0]?.text}
    </a>
</div>