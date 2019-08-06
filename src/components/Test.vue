<template>
	<div id = "didi-navigator">
		<ul>
			<li v-for="tab in tabs">
				{{tab.text}}
			</li>
		</ul>
	</div>
</template>
<script>
export default {
name:'HelloWorld',
data(){
	return {
   tabs:[
        {text: 'hello world1'},
		{text: 'hello world2'},
		{text: 'hello world3'},
		{text:'hello world4'},
		{text:'hello world5'},
		{text:'hello world6'}
		]
  }
}
}
</script>