<template>
  <div id="app">
    <div id="nav">
        
        <router-link to="/">Home</router-link> 
        <router-link to="/about">About</router-link>
        
      
        <router-link to="/inscription">Inscription</router-link>
        <router-link to="/connexion">Connexion</router-link>
      
      
    </div>
    <router-view/>
  </div>
</template>

<script >

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  
}

#nav {
  /*padding: 30px;*/
  background-color:  #42b983;
  /*margin-bottom: 2%;*/
  display: flex;
  justify-content: space-around;
}
/*.navContent {
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
  
}*/
a{
  padding-top: 25px;
  padding-bottom: 25px;
  padding-right: 25px;
  padding-left: 25px;
}
a:hover{
  background-color: white;
}


body{
  margin: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}


</style>
