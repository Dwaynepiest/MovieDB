<template>
  <p>Choose what part of this page you want to see:</p>
  <button @click="activeComp = 'animal-collection'">Animals</button>
  <button @click="activeComp = 'food-items'">Food</button><br>
  <div>
    <router-view></router-view>
    <component :is="activeComp"></component>
  </div>
</template>