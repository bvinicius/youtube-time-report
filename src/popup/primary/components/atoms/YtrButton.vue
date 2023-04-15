<template>
	<div
		class="ytr-button px-4 py-2 bg-ytrgray28 font-bold text-title select-none rounded-full cursor-pointer"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.ytr-button {
	&:hover {
		background-color: #404040;
	}
}
</style>
