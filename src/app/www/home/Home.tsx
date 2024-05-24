const HomePage = () => {
  return (
    <>
      <button class="p-3 font-semibold rounded bg-red-600 text-white" hx-get="/test" hx-target="#text-replace">
        Test
      </button>

      <p id="text-replace"></p>
    </>
  )
}


export default HomePage